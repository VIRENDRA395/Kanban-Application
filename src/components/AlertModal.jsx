import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function AlertModal({
  open,
  setOpen,
  title,
  description,
  execute,
  setParent,
}) {
  function confirmDelete() {
    setOpen(false);
    execute();
  }
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setParent(true);
        }}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          className="alert-modal"
        >
          <DialogTitle sx={{ color: "var(--red)" }}>
            <WarningRoundedIcon />
            {title}
          </DialogTitle>
          <p>{description}</p>
          <div className="btns">
            <Button
              className="btn delete-button"
              variant="solid"
              color="danger"
              onClick={confirmDelete}
            >
              Delete
            </Button>
            <Button
              className="btn cancel-button"
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false);
                setParent(true);
              }}
            >
              Cancel
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
