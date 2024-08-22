// import { saveAs } from 'file-saver';
// import XLSX from 'sheetjs-style';
import PropTypes from 'prop-types';
import { useRef, useCallback } from "react";
import XLSX from "xlsx";

const ExcelLayout = () => {   

    const tbl = useRef();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const xport = useCallback(() => {
        /* Create worksheet from HTML DOM TABLE */
    const wb = XLSX.utils.table_to_book(tbl.current);

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
    });

    return(
        <div className="w-full h-full">
               <table ref={tbl}><tbody>
                    <tr><td colSpan="3">SheetJS Table Export</td></tr>
                    <tr><td>Author</td><td>ID</td><td>你好!</td></tr>
                    <tr><td>SheetJS</td><td>7262</td><td>வணக்கம்!</td></tr>
                    <tr><td colSpan="3">
                        <a href="//sheetjs.com">Powered by SheetJS</a>
                    </td></tr>
                    </tbody></table>
                <button onClick={xport}><b>Export XLSX!</b></button>
        </div>
    );
};

ExcelLayout.propTypes = {
    excelData: PropTypes.array.isRequired,
    filename: PropTypes.string.isRequired,
};

export default ExcelLayout;