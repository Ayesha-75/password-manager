import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

const colorsList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    isTrue: false,
    latestList: [],
    isShow: false,
    website: '',
    username: '',
    password: '',
  }

  onAddWebsite = event => {
    this.setState({website: event.target.value})
  }

  onAddUsername = event => {
    this.setState({username: event.target.value})
  }

  onAddPassword = event => {
    this.setState({password: event.target.value})
  }

  onAddContact = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorsList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: '',
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(each => each.id !== id)
    const length = newList.length !== 0
    this.setState({latestList: newList, isTrue: length})
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <form className="bottom-container" onSubmit={this.onAddContact}>
          <div className="add-password-container">
            <h1 className="heading">Add New Password</h1>
            <div className="website-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="img"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                onChange={this.onAddWebsite}
                value={website}
              />
            </div>
            <div className="website-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="img"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                onChange={this.onAddUsername}
                value={username}
              />
            </div>
            <div className="website-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="img"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                onChange={this.onAddPassword}
                value={password}
              />
            </div>
            <div className="btn-container">
              <button className="btn" type="submit">
                Add
              </button>
            </div>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </form>
        <div className="bottom-container-2">
          <div className="count-btn-container">
            <div className="display">
              <h1 className="heading">Your Passwords</h1>
              <p className="count-btn">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="right">
            <input type="checkbox" id="checkbox" onChange={this.showPassword} />
            <label className="heading" htmlFor="checkbox">
              Show passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-img"
                alt="no passwords"
              />
              <p className="para">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(each => (
                <li className="item-list" id={each.id} key={each.id}>
                  <p className={`initial ${each.classAdd}`}>
                    {each.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{each.websiteName}</p>
                    <p className="website">{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="star-img"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{each.password}</p>}
                  </div>
                  <button
                    className="del-btn"
                    type="button"
                    onClick={() => this.deleteItem(each.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
