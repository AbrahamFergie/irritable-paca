import ChatConstants from './ChatConstants'
import AppDispatcher from './Dispatcher'


const ChatActions = {
  toggleVisibility() {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.TOGGLE_VISIBILITY
    })
  },
  submitMessage(message, className, received) {
    AppDispatcher.handleViewAction({
      actionType: ChatConstants.SUBMIT_MESSAGE,
      message,
      className,
      received
    })
  }
}

export default ChatActions
