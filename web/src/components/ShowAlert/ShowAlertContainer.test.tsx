import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import { ShowAlertContainer } from "./ShowAlertContainer";

describe('ShowAlert Container Component Test', () => {

    it('Should render correctly', () => {
        const initialState = {
            notificacaoUsuario: {
                mostrar: true,
                status: 'success',
                mensagem: 'Test message'
            }
        };

        const store = configureStore({ reducer: (state = initialState) => state });

        const { queryByText } = render(
            <Provider store={store}>
                <ShowAlertContainer />
            </Provider>
        );

        expect(queryByText('Test message')).toBeInTheDocument();
    });

    it('Should render an error message correctly', () => {
        const errorState = {
            notificacaoUsuario: {
                mostrar: true,
                status: 'error',
                mensagem: 'Error message'
            }
        };

        const errorStore = configureStore({ reducer: (state = errorState) => state });

        const { queryByText } = render(
            <Provider store={errorStore}>
                <ShowAlertContainer />
            </Provider>
        );

        expect(queryByText('Error message')).toBeInTheDocument();
    });

    it('Should render correctly without message when notification should not be shown', () => {
        const hiddenState = {
            notificacaoUsuario: {
                mostrar: false,
                status: 'success',
                mensagem: 'Test message'
            }
        };

        const hiddenStore = configureStore({ reducer: (state = hiddenState) => state });

        const { queryByText } = render(
            <Provider store={hiddenStore}>
                <ShowAlertContainer />
            </Provider>
        );

        expect(queryByText('Test message')).not.toBeInTheDocument();

    });

    it('Should render correctly without message when notification should not be shown', () => {
        const empytyMessageState = {
            notificacaoUsuario: {
                mostrar: true,
                status: 'success',
                mensagem: ''
            }
        };

        const empytyMessageStore = configureStore({ reducer: (state = empytyMessageState) => state });

        const { container } = render(
            <Provider store={empytyMessageStore}>
                <ShowAlertContainer />
            </Provider>
        );

        expect(container.firstChild).toBeNull();
    });
});
