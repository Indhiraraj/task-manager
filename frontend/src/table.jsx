import React from "react";

const Table = ({ children, className }) => {
  return <table className={`w-full border-collapse ${className}`}>{children}</table>;
};

const TableHead = ({ children }) => {
  return <thead className="bg-gray-300">{children}</thead>;
};

const TableRow = ({ children }) => {
  return <tr className="border-b">{children}</tr>;
};

const TableCell = ({ children, className }) => {
  return <td className={`p-4 border ${className}`}>{children}</td>;
};

const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export { Table, TableHead, TableRow, TableCell, TableBody };
