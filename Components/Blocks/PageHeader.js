import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        backgroundColor : theme.palette.white.main,
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "500"
    }
}))

function PageHeader({Title}) {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                {Title}
            </div>
        </div>
    )
}

export default PageHeader
