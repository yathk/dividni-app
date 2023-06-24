import { Box, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import TinyEditor from './TinyEditor'
import { DataStoreContext } from '../App'

export default function McqAnswer({
	index,
	VAR_DECORATOR,
	setDataDirty
}) {

	const {DATA_STORE} = useContext(DataStoreContext);

	return (
		<Stack
			flexDirection={'row'}
		>
		<Typography sx={{color: 'white'}}>{index}:</Typography>
			<TinyEditor
				idName={`answer${index}`}
				datastore={DATA_STORE}
				varDecorator={VAR_DECORATOR}
				handleDataChange={() => setDataDirty(true)}
			/>
		</Stack>
	)
}
