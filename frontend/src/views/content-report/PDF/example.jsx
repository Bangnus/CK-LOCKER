import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fecthUsers } from '../../../actions/authAction';
import PreviewPDF from './PreviewPdf';
import PageLoading from '../../../components/content-loading/page-loading';

const Quixote = () => {

    const dispatch = useDispatch();
    const AllUsers = useSelector((state) => state.auth.users)
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fecthAllUsers = async () => {
        try {
            const response = await dispatch(fecthUsers());
            if (response.status === true) {
                setUsers(response.data.body);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        if (AllUsers.length === 0) {
            fecthAllUsers();
        }

        if (users) {
            setIsLoading(false);
        }
    }, [AllUsers, fecthAllUsers, users]);

    return(
        <div>
            {
                isLoading ?
                <PageLoading />
                :
                <PreviewPDF>
                    <Document>
                        <Page style={styles.body}>
                            {
                                users.map((item, key) => (
                                    <Text key={key} style={styles.header} fixed>
                                        {item.name} - {item.email}
                                    </Text>
                                ))
                            }
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                            `${pageNumber} / ${totalPages}`
                            )} fixed />
                        </Page>
                    </Document>
                </PreviewPDF>
            }
        </div>
    );
}

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
  
export default Quixote;