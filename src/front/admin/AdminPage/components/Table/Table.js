import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { useSnackbar } from 'notistack';
import { client, errorHandle } from '../../../../client';
import './Table.css';
const useStyles = makeStyles(styles);


export default function CustomTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState(false);
  const snackbar = useSnackbar();
  const [requestIndex, setRequestIndex] = useState(false);
  const [state, setState] = useState({
    posts: [],
    total: 0,
  });
  const { tableHead, tableHeaderColor, link, onNewItem} = props;
  const fetchData = page => {
    client.get(`/${link}`, {
      params: {
        page: page || 1,
      },
    })
      .then(response => {
        const data = response.data.posts;
        const total = response.data.total;
        state.posts = data;
        state.total = total;
        setState({ ...state });
        setRequest(false);
      }).catch(error => {
      errorHandle(error, snackbar);
    });
  };
  useEffect(() => {
    setRequest(true);
    fetchData(page);
  }, [page]);

  return (
    <div className={classes.tableResponsive}>
      <Button variant="contained" color="primary" onClick={onNewItem}>Add new {props.itemName}</Button>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
      { state.posts.length?  <TableBody>
          {state.posts.map((prop, key) => {
            const keyList = Object.keys(prop)
            console.log(keyList);
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {keyList.map((keyName, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {keyName==='images' ? <img className="table-preview" src={prop[keyName][0]}/>:prop[keyName]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>: null}
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  itemName:  PropTypes.string,
  link: PropTypes.string,
  onNewItem: PropTypes.func
};
