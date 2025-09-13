import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EditorService } from '../../../services/splatfest/editor';

export const isEditingGuard: CanActivateFn = () => {
  const editorService = inject(EditorService);
  const router = inject(Router);

  if (!editorService.isEditing()) {
    return router.navigate(['/']);
  }

  return true;
};
