"use client";
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

interface Tarefa {
    id: string;
    title: string;
    completed: boolean;
}

export default function Form() {

    const [tarefa, setTarefas] = useState<Tarefa[]>([]);
    const [value, setValue] = useState("");

    const adicionarTarefa = (titulo: string) => {
        const novaTarefa: Tarefa = {
            id: uuidv4(),
            title: titulo,
            completed: false
        }
        setTarefas([...tarefa, novaTarefa]);
    }

    const alterarStatus = (id: string) => {
        setTarefas(tarefa.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }

    const deletarTarefa = (id: string) => {
        setTarefas(tarefa.filter(t => t.id !== id));
    }

    const total = tarefa.length;
    const totalConcluidas = tarefa.filter(t => t.completed).length;

    const handleSubmit = () => {
        if (value.trim() === "") {
            alert("Digite uma tarefa");
            return;
        }
        adicionarTarefa(value);
        setValue("");
    };

    return (
        <>
            <div className="min-h-screen bg-gray-600 text-gray-100 p-6">
                <header className="flex justify-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-500">
                        <i className="pi pi-send text-purple-500 mr-2" />
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">todo</span>
                    </h1>
                </header>

                <section className="flex justify-center gap-2 mb-6">
                    <InputText
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="p-inputtext-sm w-80"
                    />
                    <Button label="Criar" onClick={handleSubmit} className="p-button-sm p-button-primary" />
                </section>

                <section className="max-w-2xl mx-auto">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-blue-400 font-semibold">
                            Tarefas criadas: <span className="bg-gray-700 px-2 rounded text-xs">{total}</span>
                        </h2>
                        <h2 className="text-purple-400 font-semibold">
                            Concluídas
                            <span className="ml-2 bg-gray-700 text-gray-100 px-3 py-0.5 rounded-full text-xs font-bold">
                                {total > 0 ? `${totalConcluidas} de ${total}` : "0"}
                            </span>
                        </h2>

                    </div>

                    <div className="flex flex-col gap-2">
                        {tarefa.length > 0 ? (
                            tarefa.map((t) => (
                                <div key={t.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md border border-gray-500">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={t.completed}
                                            onChange={() => alterarStatus(t.id)}
                                            className="accent-purple-500 w-4 h-4"
                                        />
                                        <span className={`text-sm ${t.completed ? "line-through text-gray-400" : "text-gray-100"}`}>
                                            {t.title}
                                        </span>
                                    </div>
                                    <Button icon="pi pi-trash" className="p-button-sm p-button-text p-button-danger" onClick={() => deletarTarefa(t.id)} />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400">Nenhuma tarefa encontrada</p>
                        )}
                    </div>
                </section>
            </div>
        </>

    )
}
