import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, Typography, useTheme } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { DataStoreContext } from '../App'
import tinymce from 'tinymce'

interface PreviewDialogProps {
	open: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	title: string
	answers: { id: string, isCorrect: boolean }[]
}

export default function PreviewDialog({ open, setIsOpen, title, answers }: PreviewDialogProps) {

	const { editorIds, DATA_STORE } = useContext(DataStoreContext);
	const [checkStatus, setCheckStatus] = useState<boolean[]>(answers.map(() => false))
	const [quesHtml, setQuesHtml] = useState<string | undefined>(tinymce.get(editorIds.current[0])?.getContent())
	const [variantChange, triggerVariantChange] = useState(false);
	const theme = useTheme()

	useEffect(() => {
		setCheckStatus(answers.map(() => false))
	}, [answers])

	useEffect(() => {
		const quesContent = tinymce.get(editorIds.current[0])?.getContent()
		if (quesContent) {
			const newHtml = injectVars(quesContent)
			setQuesHtml(newHtml)
		}
	}, [open, variantChange])

	const injectVars = (contentHtml: string) => {
		const rootEl = document.createElement('div')
		rootEl.innerHTML = contentHtml
		rootEl.style.fontSize = '24px'
		const varEls = rootEl.getElementsByClassName('variable') as HTMLCollectionOf<HTMLElement>
		for (const varEl of varEls) {
			const variable = DATA_STORE.getVariableById(varEl.getAttribute('varid'))
			varEl.innerHTML = variable.preview()
			varEl.style.border = 'none'
			varEl.style.color = theme.palette.text.secondary
			varEl.style.fontWeight = '400'
			varEl.style.padding = '0'
		}
		return rootEl.innerHTML
	}

	const handleVariantChange = () => {
		triggerVariantChange(!variantChange)
	}

	const answersHtml = answers.map((a) => tinymce.get(a.id)?.getContent())

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleCheckChange = (index: number) => {
		checkStatus[index] = !checkStatus[index]
		setCheckStatus([...checkStatus])
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth='lg'
			fullWidth
			PaperProps={{
				sx: {
					minHeight: '600px',
					p: 4,
				}
			}}
		>
			<DialogTitle style={{ fontWeight: 600, fontSize: '24px' }}>Preview</DialogTitle>
			<DialogContent>
				<Box py={6} px={6}>
					{quesHtml ?
						<div id='question-preview' dangerouslySetInnerHTML={{ __html: quesHtml }} style={{fontSize: '18px'}}/>
						:
						<Typography color='text.secondary'>No question text to show.</Typography>
					}
				</Box>

				<Stack py={6} px={6}>
					{
						answersHtml.map((answer, index) => (
							<FormControlLabel
								key={index}
								label={answer ?
									<div dangerouslySetInnerHTML={{ __html: answer }}></div>
									:
									<Typography color='text.secondary'>No answer text to show.</Typography>
								}
								control={
									<Checkbox
										checked={checkStatus[index]}
										onChange={() => handleCheckChange(index)}
										sx={{
											'&.Mui-checked': {
												color: answers[index].isCorrect ? green[600] : red[600]
											},
										}}
									/>}
							/>
						))
					}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					onClick={handleVariantChange}
				>
					Next Variant
				</Button>
			</DialogActions>
		</Dialog>
	)
}
