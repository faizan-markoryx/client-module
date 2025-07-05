

import "../../styles/client/addClientPopup.css";
import { useEffect, useRef, useState } from "react";
import { Button, Divider, Input, Modal, Space } from "antd";
import { Select } from "antd";
import {
  addNewClient,
  getCitiesData,
  getCountryData,
  getOwnersList,
  getStateData,
  updateClient,
} from "../../services/clientServices";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { useDispatch } from "react-redux";
import { setClientRefresh } from "../../redux/clientSlice";

let index = 0;

const ClientAdd = ({
  setEditClientData,
  editClientData,
  addClientModalOpen,
  setAddClientModalOpen,
}: any) => {
  const [countryData, setCountryData]: any = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [editClientId, setEditClientId] = useState(null);
  const [isLoadingClient, setIsLoadingClient] = useState(false);
  const [attachment, setAttachment]:any = useState("");


  const [addClientData, setAddClientData]: any = useState({
    clientName: "",
    websiteUrl: "",
    category: "",
    industry: "",
    city: "",
    state: "",
    country: "",
    note: "",
    clientStatus: "",
    paymentTerm: "",
    ownership: "",
    attachment: "",
  });
  // payment terms
  const [items, setItems] = useState(["Select", "Net 10", "Net 20"]);
  const [name, setName] = useState("");
  const inputRef: any = useRef<InputRef>(null);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // categoty

  const [itemsOne, setItemsOne] = useState(["Select", "Direct", "Tier 1"]);
  const [nameOne, setNameOne] = useState("");
  const inputRefOne = useRef<InputRef>(null);

  const onNameChangeOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameOne(event.target.value);

  };

  const addItemOne = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItemsOne([...itemsOne, nameOne || `New item ${index++}`]);
    setNameOne("");
    setTimeout(() => {
      inputRefOne.current?.focus();
    }, 0);
  };

  // Client Status: //

  const [itemsTo, setItemsTo] = useState([
    "Select",
    "Negotiating",
    "Active",
    "Inactive",
  ]);
  const [nameTo, setNameTo] = useState("");
  const [error400Create, setError400Create]: any = useState({});

  const inputRefTo = useRef<InputRef>(null);

  const onNameChangeTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameTo(event.target.value);
  };

  const addItemTo = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItemsTo([...itemsTo, nameTo || `New item ${index++}`]);
    setNameTo("");
    setTimeout(() => {
      inputRefTo.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (!addClientModalOpen) return;
    getClientCountry();
    getOwnerListData();
    if (editClientData?.id !== undefined && editClientData?.id !== null) {
      setAddClientData({
        clientName: editClientData.clientName,
        websiteUrl: editClientData.websiteUrl,
        category: editClientData.category,
        industry: editClientData.industry,
        city: editClientData.city,
        state: editClientData.state,
        country: editClientData.country,
        clientStatus: editClientData.clientStatus,
        paymentTerm: editClientData.paymentTerm,
        ownership: editClientData?.ownershipId,
      });
      setEditClientId(editClientData?.id);
    } else {
      return
    }

  }, [addClientModalOpen]);


  const handleReset = () => {
    setAddClientData({
      clientName: "",
      websiteUrl: "",
      category: "",
      industry: "",
      city: "",
      state: "",
      country: "",
      note: "",
      clientStatus: "",
      paymentTerm: "",
      ownership: "",
      attachment: "",
    });
    setCitiesData([]);
    setStatesData([]);
  };

  const getClientCountry = async () => {
    await getCountryData()
      .then((res: any) => {
        if (res.success) {
          setCountryData(res?.data);
          if (editClientData?.id !== undefined || editClientData?.id !== null) {
            res?.data?.map((item: any) => {
              if (item?.name === editClientData?.country) {
                handleStatesData(item?.id)
              }

            })
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getOwnerListData = async () => {
    await getOwnersList()
      .then((res: any) => {
        if (res.success) {
          setUserList(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };


  const showClientModal = async () => {
    setEditClientData({});
    handleReset();
    await setAddClientModalOpen(true);
  };

  const dispatch = useDispatch();
  const handleClientSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("clientName", addClientData?.clientName);
    data.append("websiteUrl", addClientData?.websiteUrl);
    data.append("ownership", addClientData?.ownership);
    data.append("city", addClientData?.city);
    data.append("state", addClientData?.state);
    data.append("country", addClientData?.country);
    data.append("industry", addClientData?.industry);
    data.append("paymentTerm", addClientData?.paymentTerm);
    data.append("category", addClientData?.category);
    data.append("clientStatus", addClientData?.clientStatus);
    data.append("document",attachment);

    if (editClientId !== undefined && editClientId !== null) {
      setIsLoadingClient(true);
      data.append("id", editClientId);

      updateClient(data)
        .then((res: any) => {
          if (res.success) {
            setAddClientModalOpen(false);
            dispatch(setClientRefresh());
            handleReset();
            setIsLoadingClient(false);
            setEditClientId(null);
          }
        })
        .catch(() => {
          setIsLoadingClient(false);
        });
    } else {
      setIsLoadingClient(true);

      addNewClient(data)
        .then((res: any) => {
          if (res.success) {
            setAddClientModalOpen(false);
            dispatch(setClientRefresh());
            handleReset();
            setIsLoadingClient(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setError400Create(error?.data?.errors || {});
          setIsLoadingClient(false);
        });
    }
  };

  const handlePopCancel = () => {
    setEditClientId(null);
    setAddClientModalOpen(false);
    handleReset();
    setEditClientData({});
  };

  const handleStatesData = (value: any) => {
    getStateData({ countryId: value }).then((res: any) => {
      if (res.success) {
        setStatesData(res?.states);
        if (editClientData?.id !== undefined || editClientData?.id !== null) {
          res?.states?.map((item: any) => {
            if (item?.name === editClientData?.state) {
              handleCitiesData(item?.id)
            }

          })
        }
      }
    });
  }
  const handleCitiesData = (value: any) => {
    getCitiesData({ stateId: value }).then((res: any) => {
      if (res.success) {
        setCitiesData(res?.cities);
      }
    });
  }

  return (
    <>
      <div>
        <button
          className="client-table-head-add-client"
          onClick={showClientModal}
        >
          Add Client
        </button>
      </div>

      <Modal
        afterClose={() => {
          setAddClientData({
            clientName: "",
            websiteUrl: "",
            category: "",
            industry: "",
            city: "",
            state: "",
            country: "",
            note: "",
            clientStatus: "",
            paymentTerm: "",
            ownership: "",
            attachment: "",
          }),
            setError400Create("");
        }}
        className="add-client-pop-modal"
        wrapClassName="add-clint-wrap"
        width={"94%"}
        open={addClientModalOpen}
        onOk={() => setAddClientModalOpen(false)}
        onCancel={handlePopCancel}
        footer={null}
      >
        <form onSubmit={handleClientSubmit} className="main-clint-popUp-body">
            <div className="clint-btn-sec">
              <p className="add-client-header-sec">
                {editClientId !== null && editClientId !== undefined
                  ? "Edit"
                  : "Add"}{" "}
                Client
              </p>
            </div>
            <div className="all-input-sec">
              <div className="main-add-client-section">
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    <span className="text-red-500 font-bold">*</span> Client :

                  </label>
                  <input
                    required
                    type="text"
                    className={error400Create?.clientName ? 'client-input-sec2' : "client-input-sec"}
                    value={addClientData?.clientName}
                    onChange={(e: any) => {
                      setAddClientData({
                        ...addClientData,
                        clientName: e.target.value,
                      });
                    }}

                  />
                  {error400Create?.clientName && (
                    <span className="text-[red]">
                      {error400Create?.clientName}
                    </span>
                  )}
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    <span className="text-red-500 font-bold">*</span> Website :{" "}

                  </label>
                  <input
                    required
                    type="text"
                    className={error400Create?.websiteUrl ? "client-input-sec2" : 'client-input-sec'}
                    name="websiteUrl"
                    placeholder="https://www.example.com"
                    value={addClientData?.websiteUrl}
                    onChange={(e: any) => {
                      // http
                      let val = e.target.value
                        .toLowerCase()
                        .replace("http://", "https://");
                      if (val == "https:/") {
                        val = "https://";
                      }
                      if (val == "http:/") {
                        val = "http://";
                      }
                      if (!val.includes(`https://`) && val != "") {
                        val = "https://" + e.target.value;
                      }

                      setAddClientData({ ...addClientData, [e.target.name]: val });
                    }}
                  />
                  {error400Create?.websiteUrl && (
                    <span className="text-[red]">
                      {error400Create?.websiteUrl}
                    </span>
                  )}
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    <span className="text-red-500 font-bold">*</span> Ownership :

                  </label>
                  <Select
                    className={error400Create?.ownership ? "client-select-modal-section2" : "client-select-modal-section"}
                    showSearch
                    value={addClientData?.ownership}
                    style={{ width: 290 }}
                    optionFilterProp="children"
                    onChange={(value: string) => {
                      setAddClientData({ ...addClientData, ownership: value });
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={userList?.map((item: any) => {
                      return {
                        value: item?.id,
                        label: item?.fullName,
                      };
                    })}
                  />
                  {error400Create?.ownership && (
                    <span className="text-[red]">
                      {error400Create?.ownership}
                    </span>
                  )}
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    Country :
                  </label>
                  <Select
                    className="client-select-modal-section"
                    showSearch
                    value={addClientData?.country}
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(value: string, label: any) => {
                      setAddClientData({ ...addClientData, country: label?.label, state: "", city: "" });
                      handleStatesData(value);
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={countryData?.map((item: any) => {
                      return {
                        value: item?.id,
                        label: item?.name,
                      };
                    })}
                  />
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    State :
                  </label>
                  <Select
                    value={addClientData?.state}
                    className="client-select-modal-section"
                    showSearch
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(value: string, label: any) => {
                      setAddClientData({ ...addClientData, state: label?.label, city: "" });
                      handleCitiesData(value);
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={statesData.length > 0 ? statesData?.map((item: any) => {
                      return {
                        value: item?.id,
                        label: item?.name,
                      };
                    }) : [{ value: "Please select country first...", disabled: true }]}
                  />
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    City :
                  </label>
                  <Select
                    className="client-select-modal-section"
                    showSearch
                    value={addClientData?.city}
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(_value: string, label: any) => {
                      setAddClientData({ ...addClientData, city: label?.label });
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={citiesData?.length > 0 ? citiesData?.map((item: any) => {
                      return {
                        value: item?.id,
                        label: item?.name,
                      };
                    }) : [{ value: "Please select state first...", disabled: true }]}
                  />
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    Payment Terms :
                  </label>
                  <Select
                    className="client-select-modal-section"
                    showSearch
                    value={addClientData?.paymentTerm}
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(value: string) => {
                      setAddClientData({ ...addClientData, paymentTerm: value });
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addItem}
                          ></Button>
                        </Space>
                      </>
                    )}
                    options={items.map((item) => item === "Select" ? ({ label: item, value: item, disabled: true }) : ({ label: item, value: item }))}
                  />
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    Category :
                  </label>
                  <Select
                    className="client-select-modal-section"
                    showSearch
                    value={addClientData?.category}
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(value: string) => {
                      setAddClientData({ ...addClientData, category: value });
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={nameOne}
                            onChange={onNameChangeOne}
                          />
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addItemOne}
                          ></Button>
                        </Space>
                      </>
                    )}
                    options={itemsOne.map((item) => item === "Select" ? ({ label: item, value: item, disabled: true }) : ({ label: item, value: item }))}
                  />
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    Client Status :
                  </label>
                  <Select
                    className="font-semibold client-select-modal-section"
                    showSearch
                    value={addClientData?.clientStatus}
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(value: string) => {
                      setAddClientData({ ...addClientData, clientStatus: value });
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={nameTo}
                            onChange={onNameChangeTo}
                          />
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addItemTo}
                          ></Button>
                        </Space>
                      </>
                    )}
                    options={itemsTo.map((item) => item === "Select" ? ({ label: item, value: item, disabled: true }) : ({ label: item, value: item }))}
                  />
                </div>
                <div className="add-client-main-form">
                  <label htmlFor="" className="client-label-sec">
                    {" "}
                    Industry :
                  </label>
                  <Select
                    className="client-select-modal-section"
                    showSearch
                    value={addClientData?.industry}
                    style={{ width: 290 }}
                    defaultValue="Select"
                    optionFilterProp="children"
                    onChange={(value: string) => {
                      setAddClientData({ ...addClientData, industry: value });
                    }}
                    onSearch={(value: string) => {
                      console.log("search:", value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      { value: "IT", label: "IT" },
                      { value: "Finance", label: "Finance" },
                      { value: "Retail", label: "Retail" },
                    ]}
                  />
                </div>
                <div className="add-client-main-form ">
                  {!editClientId &&
                    <>
                      <label htmlFor="" className="client-label-sec">
                        {" "}
                        Notes :
                      </label>
                      <textarea
                        name=""
                        id=""
                        className="client-add-note-textarea"
                        value={addClientData?.note}
                        onChange={(e: any) => {
                          setAddClientData({
                            ...addClientData,
                            note: e.target.value,
                          });
                        }}
                      ></textarea>
                    </>
                  }
                </div>
                <div className="add-client-main-form ">
                  {!editClientId &&
                    <>
                      <label htmlFor="" className="client-label-sec">
                        {" "}
                        Attachment :
                      </label>
                      <input
                        type="file"
                        name="document"
                        accept="image/*,.pdf"
                        className="rounded-none bg-white outline-none w-[290px]"
                        value={addClientData?.attachment}
                        onChange={(e: any) => {
                          setAttachment(e.target.files[0])
                        }}
                      />
                    </>
                  }
                </div>
              </div>

              <div className="add-client-last-btn">
                <Button
                  htmlType="submit"
                  className="client-submit-click"
                  loading={isLoadingClient}
                >
                  {editClientId !== null && editClientId !== undefined
                    ? "Update"
                    : "Submit"}
                </Button>
                <button
                  className="client-clear-click"
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleReset();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
        </form>
      </Modal>
    </>
  );
};

export default ClientAdd;
