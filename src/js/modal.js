import { onCartBtnModalClick, onWishBtnModalClick } from './handlers';
import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEcsKeyPress);
  refs.modal.addEventListener('click', onBackdropClick);
  refs.modalCloseBtn.addEventListener('click', closeModal);

  refs.modalCartBtn.addEventListener('click', onCartBtnModalClick);
  refs.modalWishBtn.addEventListener('click', onWishBtnModalClick);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onEcsKeyPress);
  refs.modal.removeEventListener('click', onBackdropClick);
  refs.modalCloseBtn.removeEventListener('click', closeModal);

  refs.modalCartBtn.removeEventListener('click', onCartBtnModalClick);
  refs.modalWishBtn.removeEventListener('click', onWishBtnModalClick);
}

function onEcsKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
}
