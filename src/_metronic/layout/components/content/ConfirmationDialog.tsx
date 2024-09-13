import Swal from "sweetalert2";

interface Props {
  text: string;
  onConfirm: () => void;
}

const ConfirmationDialog = async (
  options: Props = {
    text: "",
    onConfirm: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
  }
) => {
  const { text, onConfirm } = options;

  const result = await Swal.fire({
    title: "Apakah anda yakin?",
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Confirmed");
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (result.isConfirmed) {
    onConfirm();
  }
};

export default ConfirmationDialog;
