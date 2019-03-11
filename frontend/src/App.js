import React, { Component } from "react";
import "./Style/App.css";
import Events from "./Components/Public/Events.js";
import Form from "./Components/Admin/Events/AdminForm.js";
import { BrowserRouter, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin.js";
import AdminEvents from "./Components/Admin/Events/AdminEvents.js";
import FloaterForm from "./Components/Admin/Floaters/FloaterForm";
import mainPage from "./Components/Public/MainPage";
import Floaters from "./Components/Admin/Floaters/Floaters.js";
import SingleEvent from "./Components/Public/SingleEvent";
import AdminSingleEvent from "./Components/Admin/Events/AdminSingleEvent";
import AddToVolunteerList from "./Components/Public/AddToVolunteerList.js";
import EditEvent from "./Components/Admin/Events/EditEvent";
import moment from "moment";
moment.locale("en");

class App extends Component {
    state = {
        events: []
    };

    // componentDidMount() {
    //     fetch("/events/api/")
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({ events: data.events });
    //         });
    // }

    componentDidMount() {
        this.fetchEvents();
    }
    fetchEvents = () => {
        return fetch("/events/api/")
            .then(res => res.json())
            .then(data => {
                let sortedEvents = data.events;
                sortedEvents.sort((a, b) => {
                    return moment(b.date).diff(moment(a.date));
                });
                this.setState({ events: sortedEvents });
                //    console.log(data);

                // data.sort((a, b) => moment(a.date) - moment(b.date));
                //    console.log(data);
            });
    };

    // toDelete(id) {
    //     fetch("/events/api/" + id, {
    //         method: "delete"
    //     }).then(response => {
    //         if (response.status === 500) {
    //             alert("Error: Failed to delete event");
    //         } else {
    //             window.location.reload();
    //         }
    //     });
    // }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route
                            path="/events"
                            render={() => <Events events={this.state.events} />}
                        />
                        <Route exact path="/" component={mainPage} />
                        <Route path="/event/:id" component={SingleEvent} />
                        <Route
                            path="/admin/event/:id"
                            render={props => (
                                <AdminSingleEvent
                                    id={props.match.params.id}
                                    fetchEvents={this.fetchEvents}
                                />
                            )}
                        />

                        <Route exact path="/admin" component={Admin} />
                        <Route path="/admin/events/add" component={Form} />
                        <Route
                            path="/admin/floaters/add"
                            component={FloaterForm}
                        />
                        <Route
                            path="/admin/floaters/addToList"
                            component={AddToVolunteerList}
                        />
                        <Route
                            exact
                            path="/admin/events"
                            render={() => (
                                <AdminEvents
                                    events={this.state.events}
                                    // deleteEvent={this.toDelete}
                                    fetchEvents={this.fetchEvents}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/admin/floaters"
                            render={() => <Floaters />}
                        />
                        <Route exact path="/admin/newevent" component={Form} />
                        <Route
                            exact
                            path="/admin/editevent/:id"
                            render={(props) => <EditEvent
                                _id={props.match.params.id}
                            />}
                        />
                        {/* <Route
                            path="/admin/event/:id"
                            component={AdminSingleEvent}
                        /> */}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
