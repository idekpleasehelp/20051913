import React from "react";
import './DisplayData.css';

const formatTime = dateTime => {
    return new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date(dateTime.toSrring()))
}

const DisplayData = props => {
    const { t } = useTranslation ();
    const filteredData = props.filteredData.sort((a , b) => (a.scheduleedTime > b.scheduleedTime ? 1:-1)).map(train => ({
        ...train,
        time: train.actualTime && formatTime(train.actualTime) !== formatTime(train.scheduleedTime) ? (
            <>
            <span className="red">{formatTime(train.scheduleedTime)}</span>
            <span className="under">({formatTime(train.scheduleedTime)})</span>
            </>
        ) : (formatTime(train.scheduleedTime))
    }))
.map(train => (
    <tr key={train.trainNumber + '_' + train.scheduleedTime}
    className={train.canceled ? 'cancelled' : null}
    >
        <td>{train.trainNumber}</td>
        <td>{train.origin}</td>
        <td>{train.destination}</td>
        <td>
            {train.time}{' '}
            {train.canceled ? (<span className="cancelled">{t('Cancelled')}</span>) : null}
        </td>
    </tr>
))
}
return (
    <table className="DisplayData">
        <thread>
            <tr>
                <th>{t('Train')}</th>
                <th>{t('Origin')}</th>
                <th>{t('Destination')}</th>
                <th>{props.display === 'arrival' ? t('Arrival'): t('Departure')}</th>
            </tr>
        </thread>
        <tbody>{filteredData}</tbody>
    </table>
)

export default DisplayData;
