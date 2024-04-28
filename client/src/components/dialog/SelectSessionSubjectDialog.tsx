import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Subject } from "@prisma/client";

interface SelectSessionSubjectDialogProps {
  open: boolean;
  onClose: () => void;
  value?: Subject
}

export function SelectSessionSubjectDialog({
                                             open,
                                             onClose,
                                              value
                                           }: SelectSessionSubjectDialogProps) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Předmět</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {JSON.stringify(value)}
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          onClose();
        }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
