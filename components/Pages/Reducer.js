export const watering = 'watering';
export const notifications = 'notifications';
export const name = 'name';
export const moistureLevel = 'moistureLevel';
export const sensorPin = 'sensorPin';
export const pumpPin = 'pumpPin';

export default reducer = (state, action) => {
  switch (action.type) {
    case watering:
      return state.map(o => {
        if (o.id === action.payload.id)
          return {...o, watering: action.payload.watering};
        return o;
      });
    case notifications:
      return state.map(o => {
        if (o.id === action.payload.id)
          return {...o, notifications: action.payload.notifications};
        return o;
      });
    case name:
      return state.map(o => {
        if (o.id === action.payload.id)
          return {...o, name: action.payload.name};
        return o;
      });
    case moistureLevel:
      return state.map(o => {
        if (o.id === action.payload.id)
          return {...o, moistureLevel: action.payload.moistureLevel};
        return o;
      });
    case sensorPin:
      return state.map(o => {
        if (o.id === action.payload.id)
          return {...o, sensorPin: action.payload.sensorPin};
        return o;
      });
    case pumpPin:
      return state.map(o => {
        if (o.id === action.payload.id)
          return {...o, pumpPin: action.payload.pumpPin};
        return o;
      });
    case 'init':
      return action.payload;
      break;
    default:
      break;
  }
};
