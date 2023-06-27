import { IconButton, Typography, Checkbox, FormHelperText, FormControlLabel, Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { grey, green } from '@mui/material/colors';
import TinyEditor from './TinyEditor'
import { DataStoreContext } from '../App'
import CloseIcon from '@mui/icons-material/Close';


export default function McqAnswer({
	idName,
	index,
	VAR_DECORATOR,
	setDataDirty,
	handleRemoveAnswer,
	answers,
	setAnswers,
}) {

	const { DATA_STORE } = useContext(DataStoreContext);

	const handleChange = (e, value) => {
		answers[index].isCorrect = !answers[index].isCorrect
		setAnswers([...answers])
	}

	return (
		<div
			className={"mcq-answer-field"}
		>
			<Button
					color='primary'
					onClick={() => handleRemoveAnswer(idName)}
					sx={{
						height: '100%',
						marginRight: '25px',
						color: 'white',
						minWidth: '0',
						padding: '10px'
					}}
				>
					<CloseIcon fontSize='medium'/>
				</Button>
			<Typography
				sx={{ color: 'white', display: 'inline' }}
				className='answer-label'
			>
				{index+1}:
			</Typography>
			<TinyEditor
				idName={idName}
				datastore={DATA_STORE}
				varDecorator={VAR_DECORATOR}
				handleDataChange={() => setDataDirty(true)}
			/>

			<FormControlLabel
				control={
					<Checkbox
						checked={answers[index].isCorrect}
						onChange={handleChange}
						sx={{
							color: 'white',
							'&.Mui-checked': {
								color: green[600],
							},
						}}
					/>}
				label="Mark as correct"
				sx={{
					color: 'white'
				}}
			>
			</FormControlLabel>
		</div>
	)
}
