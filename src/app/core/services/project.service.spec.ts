import { TestBed } from '@angular/core/testing';
import { ProjectService, ProjectData } from './project.service';

describe('ProjectService', () => {
    let service: ProjectService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProjectService);
        localStorage.clear();
    });


    it('should create first project when localStorage is empty', () => {
        service.createProject('Test Project', 'Test Description', '1/1/2024', '1/31/2024');

        const projects = service.fetchAllProjects();
        expect(projects.length).toBe(1);
        expect(projects[0].name).toBe('Test Project');
        expect(projects[0].description).toBe('Test Description');

    });


    it('should return empty array when no projects exist', () => {
        const projects = service.fetchAllProjects();
        expect(projects).toEqual([]);
    });


    it('should return all projects', () => {
        service.createProject('Project 1', 'Description 1', '1/1/2024', '1/31/2024');
        service.createProject('Project 2', 'Description 2', '2/1/2024', '2/28/2024');

        const projects = service.fetchAllProjects();
        expect(projects.length).toBe(2);
    });



    it('should return empty project when id not found', () => {
        const foundProject = service.getProjectById(3232);
        expect(foundProject.id).toBe(0);
        expect(foundProject.name).toBe('');
    });


    it('should update project details', () => {
        service.createProject('Original Project', 'Original Description', '1/1/2024', '1/31/2024');
        const projects = service.fetchAllProjects();
        const projectId = projects[0].id;

        service.updateProject(projectId, 'Updated Project', 'Updated Description', '2/1/2024', '2/28/2024', []);

        const updatedProject = service.getProjectById(projectId);
        expect(updatedProject.name).toBe('Updated Project');
        expect(updatedProject.description).toBe('Updated Description');
    });


    it('should delete project', () => {
        service.createProject('Test Project', 'Test Description', '1/1/2024', '1/31/2024');
        const projects = service.fetchAllProjects();
        const projectId = projects[0].id;

        const result = service.deleteProject(projectId);
        expect(result).toBe(true);

        const remainingProjects = service.fetchAllProjects();
        expect(remainingProjects.length).toBe(0);
    });


    it('should return false when deleting from empty list', () => {
        const result = service.deleteProject(4242);
        expect(result).toBe(false);
    });




});
