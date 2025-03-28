import swal from 'sweetalert';

export function useFlash() {
    function flash(title, message, status) {
        swal(title, message, status);
    }

    return { flash };
}