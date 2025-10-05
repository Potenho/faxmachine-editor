import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { EditorService } from '../../../services/splatfest/editor';

export const isEditingGuard: CanActivateChildFn = () => {
  const editorService = inject(EditorService);
  const router = inject(Router);

  if (!editorService.isEditing()) {
    return router.navigate(['/']);
  }

  return true;
};
