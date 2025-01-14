import { connect } from "react-redux";
import Reminder from "./Reminder";
import { ReminderInterface } from "../../utils/reminderInterface";
import { addReminder, closeAddReminder } from "../../redux/actions";

interface Props { }

interface State {
}
const mapStateToProps = (state: State, ownProps: Props) => {
    return {
      };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (reminder: ReminderInterface) => {
            dispatch(addReminder(reminder));
            dispatch(closeAddReminder());
        },
    };
};

const ReminderContainer = connect(mapStateToProps, mapDispatchToProps)(Reminder);

export default ReminderContainer;
