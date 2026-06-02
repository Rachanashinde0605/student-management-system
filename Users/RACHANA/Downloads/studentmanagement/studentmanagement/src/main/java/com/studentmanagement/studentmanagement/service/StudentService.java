package com.studentmanagement.studentmanagement.service;
import com.studentmanagement.studentmanagement.repository.StudentRepository;
import com.studentmanagement.studentmanagement.entity.Student;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;
    public Student addStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student updateStudent(Long id,
                                 Student updatedStudent) {

        Student student =
                repository.findById(id)
                        .orElseThrow();

        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setCourse(updatedStudent.getCourse());
        student.setAge(updatedStudent.getAge());

        return repository.save(student);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
}
