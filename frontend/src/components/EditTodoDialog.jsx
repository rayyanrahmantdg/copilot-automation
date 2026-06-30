import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function EditTodoDialog({ open, value, onClose, onSave }) {
  const [draftText, setDraftText] = useState(value);

  useEffect(() => {
    setDraftText(value);
  }, [value, open]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(draftText);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit todo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo text"
            fullWidth
            variant="outlined"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!draftText.trim()}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
