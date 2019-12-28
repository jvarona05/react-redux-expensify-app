//esto es para que cuando se llame a moment sin valor por default...siempre empieze desde el segundo 0 esto a para los snapshots

const moment = require.requireActual('moment')

export default (timestamp = 0) => {
    return moment(timestamp)
}