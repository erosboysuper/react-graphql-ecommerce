export default {
  control: {
    minHeight: '44px',
    width: '100%',
    background: '#f2f2f7',
    paddingLeft: '14px',
    fontSize: '16px',
    marginLeft: '10px',
    border: 'none',
    position: 'relative',
  },
  highlighter: {
    overflow: 'hidden',
  },
  input: {
    margin: 0,
  },
  '&singleLine': {
    control: {
      display: 'inline-block',
      width: '100%',
    },
    highlighter: {
      padding: '11px 40% 11px 20px',
      minHeight: 20,
      outline: 0,
      border: 0,
    },
    input: {
      padding: '11px 40% 11px 20px',
      minHeight: 20,
      outline: 0,
      border: 0,
    },
  },
  '&multiLine': {
    highlighter: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '11px 40% 11px 20px',
      minHeight: 20,
      outline: 0,
      border: 0,
    },
    input: {
      padding: '11px 40% 11px 20px',
      minHeight: 20,
      outline: 0,
      border: 0,
    },
  },
  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#F57B00',
        color: '#ffffff',
      },
    },
  },
}
