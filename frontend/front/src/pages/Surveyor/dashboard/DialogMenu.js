import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import { Box, Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={1}>
        <DialogTitle textAlign={"center"}>
          <Box>
            <Box>{`${selectedValue.ST_NUM} ${selectedValue.ST_NAME}`}</Box>
            <Box>{`${selectedValue.CITY} ${selectedValue.ZIPCODE}`}</Box>
          </Box>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick()}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "white", color: blue[600] }}>
                  <DeleteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Unassign"} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick()}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "white", color: blue[600] }}>
                  <ClearIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Disable"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Button variant="contained" ml="auto" mr="auto" size="large">
        Close
      </Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function DialogMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(props.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}