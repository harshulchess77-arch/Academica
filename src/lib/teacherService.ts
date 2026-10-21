import { supabase } from './supabase';
import type { Assignment, AssignmentTarget, Classroom, ClassroomMember, Profile } from '../types';

// Service for teacher classroom and assignment management
export class TeacherService {
  async getClassrooms(teacherId: string): Promise<Classroom[]> {
    const { data, error } = await supabase
      .from('classrooms')
      .select('*, organizations(name)')
      .eq('teacher_id', teacherId);

    if (error) throw error;
    return data as Classroom[];
  }

  async getClassroomStudents(classroomId: string): Promise<Array<ClassroomMember & { profile: any }>> {
    const { data, error } = await supabase
      .from('classroom_members')
      .select('*, profiles(*)')
      .eq('classroom_id', classroomId);

    if (error) throw error;
    return data as Array<ClassroomMember & { profile: any }>;
  }

  async createClassroom(
    teacherId: string,
    organizationId: string,
    name: string,
    gradeLevel: string | null,
    subject: string | null
  ): Promise<string> {
    const { data, error } = await supabase
      .from('classrooms')
      .insert({
        organization_id: organizationId,
        name,
        grade_level: gradeLevel,
        subject,
        teacher_id: teacherId,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async addStudentToClassroom(classroomId: string, studentId: string): Promise<void> {
    const { error } = await supabase.from('classroom_members').insert({
      classroom_id: classroomId,
      student_id: studentId,
      joined_at: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async removeStudentFromClassroom(classroomId: string, studentId: string): Promise<void> {
    const { error } = await supabase
      .from('classroom_members')
      .delete()
      .eq('classroom_id', classroomId)
      .eq('student_id', studentId);

    if (error) throw error;
  }

  async getAssignments(classroomId: string): Promise<Assignment[]> {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('classroom_id', classroomId)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data as Assignment[];
  }

  async createAssignment(
    teacherId: string,
    classroomId: string,
    title: string,
    type: 'quiz' | 'flashcard_deck',
    refId: string | null,
    dueDate: string | null
  ): Promise<string> {
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        teacher_id: teacherId,
        classroom_id: classroomId,
        title,
        type,
        ref_id: refId,
        due_date: dueDate,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async assignToStudents(assignmentId: string, studentIds: string[]): Promise<void> {
    const targets = studentIds.map((studentId) => ({
      assignment_id: assignmentId,
      student_id: studentId,
      completed: false,
    }));

    const { error } = await supabase.from('assignment_targets').insert(targets);
    if (error) throw error;
  }

  async getAssignmentProgress(assignmentId: string): Promise<AssignmentTarget[]> {
    const { data, error } = await supabase
      .from('assignment_targets')
      .select('*, profiles(display_name, email)')
      .eq('assignment_id', assignmentId);

    if (error) throw error;
    return data as AssignmentTarget[];
  }

  async getClassroomGradebook(classroomId: string): Promise<
    Array<{
      studentId: string;
      studentName: string;
      assignmentsCompleted: number;
      totalAssignments: number;
      averageScore: number;
    }>
  > {
    const [assignments, students] = await Promise.all([
      supabase.from('assignments').select('id').eq('classroom_id', classroomId),
      supabase
        .from('classroom_members')
        .select('student_id, profiles(display_name)')
        .eq('classroom_id', classroomId),
    ]);

    if (assignments.error) throw assignments.error;
    if (students.error) throw students.error;

    const assignmentIds = (assignments.data || []).map((a) => a.id);
    const studentData = students.data || [];

    const gradebook = await Promise.all(
      studentData.map(async (member) => {
        const { data: targets } = await supabase
          .from('assignment_targets')
          .select('completed')
          .eq('student_id', member.student_id)
          .in('assignment_id', assignmentIds);

        const completed = (targets || []).filter((t) => t.completed).length;
        const total = assignmentIds.length;

        return {
          studentId: member.student_id,
          studentName: (member.profiles as any)?.display_name || 'Unknown',
          assignmentsCompleted: completed,
          totalAssignments: total,
          averageScore: total > 0 ? (completed / total) * 100 : 0,
        };
      })
    );

    return gradebook;
  }
}

export const teacherService = new TeacherService();
