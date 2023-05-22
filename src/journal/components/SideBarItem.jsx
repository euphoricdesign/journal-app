import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from "@mui/material"
import { TurnedInNot } from '@mui/icons-material'
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ({ note, title, imageUrls = [], body }) => {

    const dispatch = useDispatch()

    const newTitle = () => {
        return title.length > 15 
        ? title.substring(0,17) + '...'
        : title
    }

    const handleActiveNote = () => {
        dispatch( setActiveNote( { ...note, imageUrls } ) )
    }

    return (
        <ListItem onClick={ handleActiveNote } disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle() } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}