import Proptypes from 'prop-types';

const TableLoading = ({columns, rows}) => {

    let column = [];
    let row = [];

    for (let i = 0; i < columns; i++) {
        column.push(<td><div className="h-[15px] animate-pulse animate-infinite animate-duration-1000 animate-ease-in-out bg-primarySafe rounded-sm"></div></td>);
    }

    for (let i = 0; i < rows; i++) {
        row.push(<tr>{column}</tr>);
    }

    return(
        <tbody className="text-center">
            {row}
        </tbody>
    );
};

TableLoading.propTypes = {
    columns: Proptypes.any,
    rows: Proptypes.any,
};

export default TableLoading;