import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Nav from "./nav";
import Footer from "./footer";

function Players() {
    const [players, setPlayers] = useState(() => {
        const savedPlayers = localStorage.getItem("players");
        return savedPlayers ? JSON.parse(savedPlayers) : [];
    });
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newPlayer, setNewPlayer] = useState({ id: "", name: "", email: "", order: "", group: "", pin: "", voteEveryone: "" });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("players", JSON.stringify(players));
    }, [players]);

    const handleShowModal = (index = null) => {
        if (index !== null) {
            setNewPlayer(players[index]);
            setEditIndex(index);
        } else {
            setNewPlayer({ id: "", name: "", email: "", order: "", group: "", pin: generatePin(), voteEveryone: "" });
            setEditIndex(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer({ ...newPlayer, [name]: value });
    };

    const handleAddOrEditPlayer = () => {
        if (editIndex !== null) {
            const updatedPlayers = players.map((player, index) =>
                index === editIndex ? newPlayer : player
            );
            setPlayers(updatedPlayers);
        } else {
            setPlayers([...players, newPlayer]);
        }
        handleCloseModal();
    };

    const handleDeletePlayer = (index) => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
    };

    const generatePin = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const downloadCSV = () => {
        const csvContent = [
            ["id", "name", "email", "order", "group", "pin", "voteEveryone"],
            ...players.map(player => [player.id, player.name, player.email, player.order, player.group, player.pin, player.voteEveryone])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "players.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const importedPlayers = results.data.map((row) => ({
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        order: row.order,
                        group: row.group,
                        pin: row.pin || generatePin(),
                        voteEveryone: row.voteEveryone,
                    }));
                    setPlayers([...players, ...importedPlayers]);
                },
            });
        }
    };

    return (
        <div className="container-fluid">
            <Nav />

            <h1>Jugadores</h1>
            <Button variant="primary" onClick={() => handleShowModal()}>
                Agregar Jugador
            </Button>
            <Button variant="success" onClick={downloadCSV} className="ms-2">
                Descargar CSV
            </Button>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="ms-2"
            />

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Orden</th>
                        <th>Grupo</th>
                        <th>PIN</th>
                        <th>Votar Todos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{player.id}</td>
                            <td>{player.name}</td>
                            <td>{player.email}</td>
                            <td>{player.order}</td>
                            <td>{player.group}</td>
                            <td>{player.pin}</td>
                            <td>{player.voteEveryone}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleShowModal(index)}
                                    className="me-2"
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeletePlayer(index)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? "Editar Jugador" : "Agregar Jugador"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlayerId">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                value={newPlayer.id}
                                onChange={handleInputChange}
                                placeholder="Ingresa el ID del jugador"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerName" className="mt-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newPlayer.name}
                                onChange={handleInputChange}
                                placeholder="Ingresa el nombre del jugador"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newPlayer.email}
                                onChange={handleInputChange}
                                placeholder="Ingresa el correo electrónico del jugador"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerOrder" className="mt-3">
                            <Form.Label>Orden</Form.Label>
                            <Form.Control
                                type="number"
                                name="order"
                                value={newPlayer.order}
                                onChange={handleInputChange}
                                placeholder="Ingresa el orden del jugador"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerGroup" className="mt-3">
                            <Form.Label>Grupo</Form.Label>
                            <Form.Control
                                type="number"
                                name="group"
                                value={newPlayer.group}
                                onChange={handleInputChange}
                                placeholder="Ingresa el grupo del jugador"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerPin" className="mt-3">
                            <Form.Label>PIN</Form.Label>
                            <Form.Control
                                type="text"
                                name="pin"
                                value={newPlayer.pin}
                                onChange={handleInputChange}
                                placeholder="Ingresa el PIN del jugador"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerVoteEveryone" className="mt-3">
                            <Form.Label>Votar Todos</Form.Label>
                            <Form.Control
                                type="text"
                                name="voteEveryone"
                                value={newPlayer.voteEveryone}
                                onChange={handleInputChange}
                                placeholder="Ingresa si el jugador puede votar por todos (True/False)"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAddOrEditPlayer}>
                        {editIndex !== null ? "Guardar Cambios" : "Agregar"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
}

export default Players;