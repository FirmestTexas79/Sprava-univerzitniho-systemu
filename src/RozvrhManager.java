import java.sql.*;
import javax.swing.*;

public class RozvrhManager {
    public static void zobrazitRozvrh(int idStudent) {
        try {
            Connection connection = DatabaseManager.getConnection();

            String query = "{CALL ZobrazitRozvrhStudenta(?)}"; // Volání uložené procedury
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setInt(1, idStudent);
            ResultSet resultSet = callableStatement.executeQuery();

            StringBuilder sbPredmety = new StringBuilder("Předměty studenta (ID ").append(idStudent).append("):\n");
            while (resultSet.next()) {
                sbPredmety.append(resultSet.getString("nazev")).append("\n");
            }

            JOptionPane.showMessageDialog(null, sbPredmety.toString(), "Předměty studenta", JOptionPane.INFORMATION_MESSAGE);

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při získávání předmětů studenta: " + e.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }

    public static void zrusitPredmet() {
        // Získání ID předmětu od uživatele
        String idPredmetStr = JOptionPane.showInputDialog(null, "Zadejte ID předmětu k zrušení:", "Zrušit předmět", JOptionPane.PLAIN_MESSAGE);

        // Kontrola, zda bylo ID zadáno
        if (idPredmetStr != null && !idPredmetStr.isEmpty()) {
            int idPredmet = Integer.parseInt(idPredmetStr);

            // Vytvoření dialogového okna pro potvrzení smazání
            String potvrzeni = JOptionPane.showInputDialog(null, "Opravdu chcete smazat tento předmět? Pokud ano, napište 'ano' a potvrďte:", "Potvrzení smazání", JOptionPane.WARNING_MESSAGE);

            // Kontrola uživatelova potvrzení
            if (potvrzeni != null && potvrzeni.equalsIgnoreCase("ano")) {
                try {
                    Connection connection = DatabaseManager.getConnection();

                    // Volání uložené procedury pro odstranění předmětu
                    CallableStatement callableStatement = connection.prepareCall("{CALL OdeberPredmet(?)}");
                    callableStatement.setInt(1, idPredmet);
                    callableStatement.execute();

                    JOptionPane.showMessageDialog(null, "Předmět byl úspěšně smazán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);

                    connection.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                    JOptionPane.showMessageDialog(null, "Chyba při mazání předmětu: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
                }
            } else {
                JOptionPane.showMessageDialog(null, "Operace byla zrušena uživatelem.", "Zrušeno", JOptionPane.INFORMATION_MESSAGE);
            }
        } else {
            JOptionPane.showMessageDialog(null, "Neplatný vstup.", "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }

    public static void pridejPredmet() {
        JTextField nazevField = new JTextField();
        JTextField idKategorieField = new JTextField();
        JTextField kodField = new JTextField();

        Object[] message = {
                "Název:", nazevField,
                "ID kategorie:", idKategorieField,
                "Kód:", kodField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Přidat předmět", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            String nazev = nazevField.getText();
            int id_kategorie = Integer.parseInt(idKategorieField.getText());
            String kod = kodField.getText();

            DatabaseManager manager = new DatabaseManager();

            try {
                Connection connection = manager.getConnection();
                connection.setAutoCommit(false);

                String procedureCall = "{CALL PridaniPredmetu(?, ?, ?)}";
                CallableStatement callableStatement = connection.prepareCall(procedureCall);
                callableStatement.setString(1, nazev);
                callableStatement.setInt(2, id_kategorie);
                callableStatement.setString(3, kod);

                callableStatement.executeUpdate();

                connection.commit();
                connection.close();

                JOptionPane.showMessageDialog(null, "Předmět byl úspěšně přidán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při přidávání předmětu: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        }
    }


}
