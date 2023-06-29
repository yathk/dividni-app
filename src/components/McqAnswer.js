import { IconButton, Typography, Checkbox, FormHelperText, FormControlLabel, Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { grey, green } from '@mui/material/colors';
import TinyEditor from './TinyEditor'
import { DataStoreContext, AlertContext } from '../App'
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
  const { setAlertText } = useContext(AlertContext);


	const handleChange = (e, value) => {
		const numCorrect = answers.filter( a => a.isCorrect)
		const currentValue = answers[index].isCorrect

		// Enforces atleast 1 correct answer
		if (!currentValue || (currentValue && numCorrect.length > 1)) {
			answers[index].isCorrect = !answers[index].isCorrect
			setAlertText("")
			setAnswers([...answers])
		} else {
			setAlertText("At least one answer must be marked as correct")
		}
	}

	return (
		<div
			className={"mcq-answer-field"}
		>
			<Button
				color='white'
				onClick={() => handleRemoveAnswer(idName)}
				sx={{
					height: '100%',
					marginRight: '25px',
					color: 'white',
					minWidth: '0',
					padding: '10px'
				}}
			>
				<CloseIcon fontSize='medium' />
			</Button>
			<Typography
				variant='body2'
				sx={{ color: 'white', display: 'inline' }}
				className='answer-label'
			>
				{index + 1}:
			</Typography>
			<TinyEditor
				idName={idName}
				datastore={DATA_STORE}
				varDecorator={VAR_DECORATOR}
				handleDataChange={() => setDataDirty(true)}
			/>

			<FormControlLabel
				label={<Typography variant='body2'>Mark as correct</Typography>}
				sx={{
					'&.MuiTypography-root': {
						color: '#fffff',
					},
				}}
				control={
					<Checkbox
						checked={answers[index].isCorrect}
						onChange={handleChange}
						color='success'
						style={{
							color: green[600]
						}}
						sx={{
							'&.MuiCheckbox-root': {
								color: 'white',
								fontSize: '50px'
							},
							'&.Mui-checked': {
								color: green[600],
							},
						}}
					/>}

			>
			</FormControlLabel>
		</div>
	)
}
