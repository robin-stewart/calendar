import React, { useState } from "react";
import {
    WithStyles,
    withStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from "material-ui-pickers";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { ReminderInterface } from "../../utils/reminderInterface";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        TitleContainer: {
            margin: "10px",
            display: "flex"
        },
        DateContainer: {
            marginTop: "20px",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
            display: "flex"
        },
        ColorContainer: {
            marginTop: "20px",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
            display: "flex"
        },
        SubmitContainer: {
            marginTop: "20px",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "10px",
            display: "flex"
        }
    });

interface Props extends WithStyles<typeof styles> {
    reminder?: ReminderInterface;
    onSubmit: (reminder: ReminderInterface) => void;
}

const Reminder = (props: Props) => {
    const { classes, onSubmit, reminder } = props;
    const [title, setTitle] = useState(reminder ? reminder.title : "");
    const [dateTime, setDateTime] = useState(reminder ? reminder.date : new Date());
    const [color, setColor] = useState(reminder ? reminder.color : "");
    const labelWidth = 0;
    const colors = {
        Red: "#CC2936",
        Yellow: "#C59849",
        Green: "#43AA8B",
        Blue: "#3F88C5",
        Purple: "#643A71"
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (color.length === 0) {
            return;
        }
        const newReminder: ReminderInterface = {
            id: reminder?.id ? reminder.id : new Date().getTime(),
            title: title,
            date: dateTime,
            color: color
        }
        onSubmit(newReminder);
        alert('Successfully created new reminder!');
    }

    const handleTitleValidation = (value: string) => {
        if (value.length <= 30) {
            setTitle(value);
        }
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column" justify="flex-start" alignItems="stretch">
                <form onSubmit={e => { handleSubmit(e) }}>
                    <Grid item>
                        <TextField
                            required
                            className={classes.TitleContainer}
                            id="reminder-title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={e => handleTitleValidation(e.target.value)}
                            helperText="Note: Reminder titles cannot be longer than 30 characters."
                        />
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                label="Date & Time"
                                variant="outlined"
                                className={classes.DateContainer}
                                value={dateTime}
                                onChange={setDateTime} />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <FormControl required variant="outlined" className={classes.ColorContainer}>
                            <InputLabel htmlFor="color">Color</InputLabel>
                            <Select
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                input={
                                    <OutlinedInput
                                        labelWidth={labelWidth}
                                        name="color"
                                        id="outlined-color"
                                    />
                                }>
                                {Object.keys(colors).map(color => {
                                    return <MenuItem key={color} value={colors[color]}>
                                        {color}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.SubmitContainer}
                            variant="contained"
                            type="submit"
                            color="primary">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Reminder);
