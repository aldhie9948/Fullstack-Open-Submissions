import axios from "axios";
import React, { useState } from "react";

const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newObject) => {
  console.log(newObject);
  return axios.post(baseUrl, newObject).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

const find = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export default { getAll, create, update, find, deletePerson };
