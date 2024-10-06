import PropTypes from "prop-types"

export const CalendarEvent = ({event}) => {
    
    
    const { user, title} = event;

    
  return (
    <>
          <strong>
              { title}
      </strong>
          <span>
             -{user.name}
      </span>
    </>
  )
}

CalendarEvent.propTypes = {
    event:PropTypes.object
}
