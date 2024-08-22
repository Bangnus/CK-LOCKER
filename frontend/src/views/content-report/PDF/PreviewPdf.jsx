import { PDFViewer } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const PreviewPDF = ({children}) => {
    return(
        <div className='w-full'>
            <PDFViewer className="w-full h-screen">
                {children}
            </PDFViewer>
        </div>
    );  
}

PreviewPDF.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PreviewPDF;