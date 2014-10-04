/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var RegistrationStore = require('../../stores/RegistrationStore');
var RegistrationActions = require('../../actions/RegistrationActions');

var Well = require('react-bootstrap').Well;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

function getRegistrationState() {
    return {
        'username': RegistrationStore.get('username'),
        'email': RegistrationStore.get('email'),
        'name': RegistrationStore.get('name'),
        'password': RegistrationStore.get('password'),
        'password_repeated': RegistrationStore.get('password_repeated')
    };
}

var Register = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
        return getRegistrationState();
    },

    handleRegister: function() {
        RegistrationActions.register({
            'username': this.state.username,
            'email': this.state.email,
            'name': this.state.name,
            'password': this.state.password,
            'password_repeated': this.state.password_repeated
        });
    },

    render: function() {
        return (
            <div>
                <div className="page-header">
                    <h1>Please Sign Up</h1>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Well>
                            <form action="/register" method="post">
                                <Input type="text" name="username" placeholder="Username" addonBefore={<Glyphicon glyph="user" />} valueLink={this.linkState('username')} />
                                <Input type="text" name="email" placeholder="E-Mail" addonBefore={<Glyphicon glyph="envelope" />} valueLink={this.linkState('email')} />
                                <Input type="text" name="name" placeholder="Name" addonBefore={<Glyphicon glyph="tag" />} valueLink={this.linkState('name')} />
                                <Input type="password" name="password" placeholder="Password" addonBefore={<Glyphicon glyph="lock" />} valueLink={this.linkState('password')} />
                                <Input type="password" name="password_repeated" placeholder="Password repeated" addonBefore={<Glyphicon glyph="lock" />} valueLink={this.linkState('password_repeated')} />

                                <Button bsStyle="primary" className="btn-block" onClick={this.handleRegister}><Glyphicon glyph="road" /> Sign Up</Button>
                            </form>
                        </Well>
                    </div>
                </div>
            </div>
            );
    }
});
module.exports = Register;
