import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

function spinner({text}) {
    return (
			<div
				style={{
					height: '400px',
					display: 'flex',
					flexDirection: 'column',
					alignContent: 'center',
					justifyContent: 'center',
				}}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					<CircularProgress />
				</div>
				<p style={{ textAlign: 'center' }}>{text}</p>
			</div>
		)
}

export default spinner
