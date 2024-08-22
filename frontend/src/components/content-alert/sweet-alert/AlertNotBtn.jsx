import Swal from 'sweetalert2'

const AlrtNotBtn = ({icon, text}) => {
    return(
        Swal.fire({
            position: "center",
            icon: `${icon}`,
            text: `${text}`,
            showConfirmButton: false,
            timer: 1500
        })
    );
}

export default AlrtNotBtn;