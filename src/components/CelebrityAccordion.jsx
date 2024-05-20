import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CelebrityDetail } from "./CelebrityDetail";
import { useDispatch, useSelector } from "react-redux";
import { CelebrityActions } from "../store/celebrity.slice";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const CelebrityAccordion = ({ celebrityData, onOpen }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const expandedAccordionId = useSelector(
    (state) => state.celebrity.expandedAccordionId
  );
  const isAnyInputChanged = useSelector(
    (state) => state.celebrity.isAnyInputChanged
  );
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete?
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() =>
              dispatch(CelebrityActions.deleteCelebrity(celebrityData.id))
            }
            autoFocus
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Accordion
        expanded={expandedAccordionId === celebrityData.id}
        onChange={() => onOpen(celebrityData.id, celebrityData.inputType)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Avatar alt={celebrityData.first} src={celebrityData.picture} />
          {celebrityData.inputType === "text" ? (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginLeft: "40px" }}
            >
              {celebrityData.name}
            </Typography>
          ) : (
            <input
              style={{ marginLeft: "20px", padding: "10px", fontSize: "14px" }}
              type="text"
              value={celebrityData.name}
              onChange={(event) =>
                dispatch(
                  CelebrityActions.updateName({
                    id: celebrityData.id,
                    name: event.target.value,
                  })
                )
              }
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <CelebrityDetail celebrity={celebrityData} />
        </AccordionDetails>
        <AccordionActions>
          {celebrityData.inputType === "text" ? (
            <DeleteIcon
              sx={{ margin: "12px", cursor: "pointer" }}
              onClick={handleOpen}
            />
          ) : (
            <button
              onClick={() =>
                dispatch(
                  CelebrityActions.setPreviousDetails({ id: celebrityData.id })
                )
              }
            >
              <CancelIcon sx={{ margin: "12px", cursor: "pointer" }} />
            </button>
          )}
          {celebrityData.inputType === "text" ? (
            <EditIcon
              sx={{ margin: "12px", cursor: "pointer" }}
              onClick={() =>
                celebrityData.canEdit &&
                dispatch(
                  CelebrityActions.editCelebrityData({ id: celebrityData.id })
                )
              }
            />
          ) : (
            <button disabled={!isAnyInputChanged}>
              <CheckCircleIcon
                sx={{ margin: "12px", cursor: "pointer" }}
                onClick={() =>
                  dispatch(
                    CelebrityActions.saveCelebrityData({ id: celebrityData.id })
                  )
                }
              />
            </button>
          )}
        </AccordionActions>
      </Accordion>
    </>
  );
};
