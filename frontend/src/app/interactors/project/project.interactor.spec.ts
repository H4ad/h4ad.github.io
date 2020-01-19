import { TestBed } from '@angular/core/testing';

import { ProjectInteractor } from './project.interactor';

describe('ProjectInteractor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectInteractor = TestBed.get(ProjectInteractor);
    expect(service).toBeTruthy();
  });
});
