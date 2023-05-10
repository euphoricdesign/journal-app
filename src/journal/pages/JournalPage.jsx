import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView, NoteView } from '../views'
import { useDispatch } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

    const dispatch = useDispatch()

    const handleNewNote = () => {

        dispatch(startNewNote())
        
    }

    return (
        <JournalLayout>
            {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, accusantium rem fugit maxime nihil culpa aperiam rerum quam facere, dolorem cupiditate beatae maiores, eaque neque voluptatibus ad iure ipsa exercitationem.</Typography> */}
            <NothingSelectedView />
            {/* <NoteView /> */}

            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
                onClick={ handleNewNote }
            >
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>
        </JournalLayout>
    )
}