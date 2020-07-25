import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import {
  ActivityFormValues,
} from "../../../Models/Activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../App/Common/Form/TextInput";
import TextAreaInput from "../../../App/Common/Form/TextAreaInput";
import SelectInput from "../../../App/Common/Form/SelectInput";
import { category } from "../../../App/Common/Options/CategoryOptions";
import DateInput from "../../../App/Common/Form/DateInput";
import { CombineDateAndTime } from "../../../App/Common/Util/Util";

import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "Title field required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(5)({
      message: "Description should have morte than 5 letters",
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  time : isRequired("Time")
});
interface DetailParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = CombineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    console.log(date);
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };


  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(new ActivityFormValues());
  const activityStore = useContext(ActivityStore);
  const {
    submitting,
    createActivity,
    editActivity,
    loadActivity,
  } = activityStore;
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => {
          setActivity(new ActivityFormValues(activity));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loadActivity, match.params.id]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <FinalForm
          validate={validate}
          initialValues={activity}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit,pristine,invalid }) => (
            <Form onSubmit={handleSubmit} loading={loading}>
              <Field
                component={TextInput}
                placeholder="Title"
                value={activity.title}
                name="title"
              />
              <Field
                component={TextAreaInput}
                placeholder="Description"
                value={activity.description}
                name="description"
                rows={3}
              />
              <Field
                placeholder="Category"
                value={activity.category}
                name="category"
                component={SelectInput}
                options={category}
              />
              <Form.Group widths="equal">
                <Field
                  placeholder="Date"
                  value={activity.date}
                  name="date"
                  date={true}
                  component={DateInput}
                />
                <Field
                  placeholder="Time"
                  value={activity.time}
                  name="time"
                  time={true}
                  component={DateInput}
                />
              </Form.Group>

              <Field
                placeholder="City"
                value={activity.city}
                name="city"
                component={TextInput}
              />
              <Field
                placeholder="Venue"
                value={activity.venue}
                name="venue"
                component={TextInput}
              />
              <Button
                loading={submitting}
                disabled={invalid || pristine}
                type="submit"
                content="Submit"
                color="facebook"
                floated="right"
              />
              <Button
                onClick={
                  activity.id
                    ? () => history.push(`/activities/${activity.id}`)
                    : () => history.push("/activities")
                }
                type="button"
                content="Cancel"
                color="black"
              />
            </Form>
          )}
        />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
