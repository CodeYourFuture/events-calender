import React from "react";
import Message from "../../Message/Message";

export default class EditEvent extends React.Component {
    state = {
        lesson: "",
        event_date: "",
        description: "",
        message: false
    };
    constructor(props) {
        super(props);
        this.lessonRef = React.createRef();
        this.event_dateRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    onSubmit = event => {
        event.preventDefault();
        const body = {
            lesson: this.lessonRef.current.value,
            event_date: this.event_dateRef.current.value,
            description: this.descriptionRef.current.value
        };
        fetch("/events/" + this.props._id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "put",
            body: JSON.stringify(body)
        })
            .then(() => {
                this.lessonRef.current.value = "";
                this.event_dateRef.current.value = "";
                this.descriptionRef.current.value = "";
                this.setState({ message: true });
                this.props.history.push("/events/api/" + this.props._id);
            })

            .catch(error => console.error(error));
    };

    render() {
        return (
            <div className="container mt-2">
                <Message
                    show={this.state.message}
                    status="success"
                    message="Event Has Been Edited"
                />
                <h1 className="text-center mb-3">Editing this Event</h1>
                <form>
                    <div className="form-group">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event name"
                                    >
                                        Event Name
                                    </label>

                                    <input
                                        className="input form-control form-control-lg"
                                        defaultValue={this.props.lesson}
                                        ref={this.lessonRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event date"
                                    >
                                        Events Date
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        defaultValue={this.props.event_date}
                                        ref={this.event_dateRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event description"
                                    >
                                        Events Description
                                    </label>
                                    <textarea
                                        className="textarea form-control form-control-lg"
                                        defaultValue={this.props.description}
                                        ref={this.descriptionRef}
                                        rows="8"
                                    />
                                    <br />

                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event time"
                                    >
                                        time
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Time"
                                        ref={this.timeRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="number of Volunteers Needed"
                                    >
                                        number of Volunteers Needed
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="number of Volunteers Needed"
                                        ref={this.numVolunteersNeededRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event country"
                                    >
                                        Country
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events country"
                                        ref={this.countryRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event city"
                                    >
                                        City
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events city"
                                        ref={this.cityRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event syllabus Url"
                                    >
                                        Syllbus
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events syllabus Url"
                                        ref={this.syllabusUrlRef}
                                    />
                                    <br />

                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event Address"
                                    >
                                        Events Address
                                    </label>
                                    <textarea
                                        className="textarea form-control form-control-lg"
                                        placeholder="Adress"
                                        ref={this.addressRef}
                                        rows="4"
                                    />
                                    <br />

                                    <div
                                        className="btn-toolbar justify-content-between"
                                        role="toolbar"
                                    >
                                        <button
                                            className="btn btn-primary"
                                            onClick={e => this.onSubmit(e)}
                                        >
                                            Submit
                                        </button>

                                        <a
                                            className="btn btn-primary "
                                            href="/admin/events"
                                        >
                                            Back
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
