import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'
import { Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import { DataStoreContext } from '../../App';
import { getNewVarId } from '../TinyEditor';
import { Variable } from '../../model/Variable';
import SettingsDialog from './SettingsDialog';

interface AddVarDialogProps {
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddVarDialog({ open, setOpen }: AddVarDialogProps) {

	const [dialogOpen, setDialogOpen] = useState(false)
	const { DATA_STORE, setDataStore } = useContext(DataStoreContext);

	const [newVarId, setNewVarId] = useState<number | undefined>(undefined)
	const [variable, setVariable] = useState<Variable | undefined>(DATA_STORE.getVariableById(newVarId))


	const handleAddNewVar = (type: string) => {
		const newVar = new Variable('', getNewVarId(), type)
		DATA_STORE.addVariable(newVar)
		setNewVarId(newVar.id)
		setVariable(newVar)
		setOpen(false)
		setDialogOpen(true)
	}

	const handleCancel = () => {
		DATA_STORE.removeVariable('')
		setDialogOpen(false)
	}

	const handleSave = () => {

	}


	return (
		<>
			{	variable && newVarId && <SettingsDialog
				open={dialogOpen}
				setOpen={setDialogOpen}
				handleClose={handleCancel}
				varId={newVarId}
				variable={variable}
			/>}

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				maxWidth={"sm"}
				PaperProps={{
					sx: {
						p: 2
					}
				}}
			>
				<DialogTitle>Add Variable</DialogTitle>
				<DialogContent>
					<Button
						variant="text"
						color="primary"
						sx={{ width: '100%' }}
						onClick={() => handleAddNewVar('choice')}
					>
						Choice
					</Button>

					<Button
						variant="text"
						color="primary"
						sx={{ width: '100%' }}
						onClick={() => handleAddNewVar('random')}
					>
						Random
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}
