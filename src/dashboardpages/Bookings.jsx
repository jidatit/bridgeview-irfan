import React, { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable } from 'material-react-table';
import {
  createTheme, ThemeProvider, useTheme, Button
} from '@mui/material';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const Bookings = () => {

  const [data, setdata] = useState([]);

  const getAllBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({
          id: doc.id,
          ...doc.data(),
          name: doc.data().firstname + " " + doc.data().lastname
        });
      });
      setdata(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings()
  }, [])

  const DynamicmaxLength = data.reduce(
    (max, item) => Math.max(max, item.special_instructions ? item.special_instructions.length : 0),
    0
  );
  const DynamicmaxLengthRequests = data.reduce(
    (max, item) => Math.max(max, item.special_request ? item.special_request.length : 0),
    0
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'payment_status', //access nested data with dot notation
        header: 'Payment Status',
        size: 150,
      },
      {
        accessorKey: 'date', //access nested data with dot notation
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 150,
      },
      {
        accessorKey: 'people', //normal accessorKey
        header: 'Guests',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'booking_for',
        header: 'Booking Title',
        size: 150,
      },
      {
        accessorKey: 'contact_number',
        header: 'Contact Number',
        size: 150,
      },
      {
        accessorKey: 'special_instructions',
        header: 'Special Instructions',
        size: DynamicmaxLength >= 250 ? DynamicmaxLength : DynamicmaxLength + 250,
        // size:  250,
      },
      {
        accessorKey: 'special_request',
        header: 'Special Requests',
        size: DynamicmaxLengthRequests >= 250 ? DynamicmaxLengthRequests : DynamicmaxLengthRequests + 250,
        // size:  250,
      },
    ],
    [],
  );

  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          background: {
            default:
              'rgba(0,0,0,0)',
          },
          text: {
            primary: '#000000',
            secondary: '#46505A',
          },
        },
      }),
    [globalTheme],
  );

  const RejectBooking = async (Id) => {
    try {
      const documentRef = doc(db, "bookings", Id)
      await updateDoc(documentRef, {
        payment_status: 'rejected'
      });
      getAllBookings()
    } catch (error) {
      console.log(error)
    }
  }

  const ApproveBooking = async (Id) => {
    try {
      const documentRef = doc(db, "bookings", Id)
      await updateDoc(documentRef, {
        payment_status: 'approved'
      });
      getAllBookings()
    } catch (error) {

    }
  }

  return (
    <>
      <div className="main bg-[#F1F5F9] md:w-full w-[500px] lg:w-full flex flex-col justify-center items-center">
        <div className="w-full pl-2 pr-2 mb-[50px] items-start lg:items-center mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-18 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-center">
          <h1 className='font-semibold md:text-[40px] text-[25px] font-poppins text-black'>Bookings and Reservations</h1>
          <div className="bg-[#ffffff] w-full sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[970px] 2xl:w-[1120px] h-[auto] flex flex-col p-5 rounded-md">
            <div className="flex flex-row justify-start">
              <span className="font-bold text-black font-poppins text-2xl mb-2 mt-2 sm:mb-4 sm:mt-4 md:mb-3 md:mt-3 lg:mb-3 lg:mt-3 xl:mb-3 xl:mt-3 2xl:mb-3 2xl:mt-3">Bookings</span>
            </div>
            <ThemeProvider theme={tableTheme}>
              <MaterialReactTable
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => {
                  const handleReject = () => {
                    const selectedRows = table.getSelectedRowModel().flatRows;

                    if (selectedRows.length === 1) {
                      const selectedRowId = selectedRows[0].original.id;
                      RejectBooking(selectedRowId)
                      alert('Reject Booking with ID: ' + selectedRowId);
                    } else {
                      alert('Please select a single row to reject');
                    }
                  };
                  const handleApprove = () => {
                    const selectedRows = table.getSelectedRowModel().flatRows;

                    if (selectedRows.length === 1) {
                      const selectedRowId = selectedRows[0].original.id;
                      ApproveBooking(selectedRowId)
                      alert('Approve Booking with ID: ' + selectedRowId);
                    } else {
                      alert('Please select a single row to approve.');
                    }
                  };
                  return (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleReject}
                        variant="contained"
                      >
                        Reject
                      </Button>
                      <Button
                        color="success"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleApprove}
                        variant="contained"
                      >
                        Approve
                      </Button>
                    </div>
                  );
                }}
                muiTablePaperProps={{
                  elevation: 0,
                  sx: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderRadius: '0',
                    color: 'text.primary',
                  },
                }}
                displayColumnDefOptions={{
                  'mrt-row-actions': {
                    muiTableHeadCellProps: {
                      align: 'center',
                    },
                    size: 120,
                  },
                }}
                columns={columns}
                data={data}
                enableColumnOrdering
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bookings