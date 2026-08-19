import { create } from "zustand";

import {
    completePractice,
    createPractice,
    deletePractice,
    getPractices,
    updatePractice,
} from "../services/practiceApi";

import { CreatePracticeInput, Practice } from "../types/practice";

interface PracticeStore {

    practices: Practice[];
    loading: boolean;
    error: string | null;

    fetchPractices: () => Promise<void>;
    addPractice: (data: CreatePracticeInput) => Promise<Practice>;
    editPractice: (id: string, data: CreatePracticeInput) => Promise<Practice>;
    markComplete: (id: string) => Promise<void>;
    removePractice: (id: string) => Promise<void>;
}

export const usePracticeStore = create<PracticeStore>((set) => ({
    practices: [],
    loading: false,
    error: null,

    fetchPractices: async () => {
        try {
            set({ loading: true, error: null });
            const practices = await getPractices();
            set({ practices });
        } catch (error) {
            console.error(error);
            set({ error: "Failed to load practices" });
        } finally {
            set({ loading: false });
        }
    },

    addPractice: async (data) => {
            try {
                set({error: null});
                const createdPractice = await createPractice(data);
                set((state) => ({
                    practices: [
                        createdPractice,
                        ...state.practices,
                    ],
                }));
                return createdPractice;

            } catch (error) {
                console.error(error);
                set({error: "Failed to create practice"});
                throw error;
            }
        },

        editPractice: async (id, data) => {
            try {
                set({error: null});
                const updatedPractice = await updatePractice(id, data);
                set((state) => ({
                    practices: state.practices.map((practice) => practice.id === id ? updatedPractice : practice),
                }));
                return updatedPractice;

            } catch (error) {
                console.error(error);
                set({error: "Failed to update practice"});
                throw error;
            }
        },

        markComplete: async (id) => {
            try {
                set({error: null});
                const updatedPractice = await completePractice(id);
                set((state) => ({
                    practices: state.practices.map((practice) => practice.id === id ? updatedPractice : practice),
                }));
            } catch (error) {
                console.error(error);
                set({error: "Failed to complete practice"});
                throw error;
            }
        },


        removePractice: async (id) => {
            try {
                set({error: null});
                await deletePractice(id);

                set((state) => ({
                    practices: state.practices.filter((practice) => practice.id !== id
                        ),
                }));

            } catch (error) {
                console.error(error);
                set({error:"Failed to delete practice"});
                throw error;
            }
        },
    }));