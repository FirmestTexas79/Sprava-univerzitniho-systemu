import javax.swing.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentManager {

    public static String odeberStudenta(int idStudent) {
        String potvrzeni = JOptionPane.showInputDialog(null, "Opravdu chcete smazat tohoto studenta? Pokud ano, napište 'ano' a potvrďte:", "Potvrzení smazání", JOptionPane.WARNING_MESSAGE);

        if (potvrzeni != null && potvrzeni.equalsIgnoreCase("ano")) {
            try {
                Connection connection = DatabaseManager.getConnection();
                String callProcedure = "{CALL OdeberStudenta(?)}";
                CallableStatement callableStatement = connection.prepareCall(callProcedure);
                callableStatement.setInt(1, idStudent);
                ResultSet resultSet = callableStatement.executeQuery();

                // Získání výsledku funkce
                String vysledek = "";
                if (resultSet.next()) {
                    vysledek = resultSet.getString(1);
                }

                connection.close();
                return vysledek;
            } catch (SQLException ex) {
                ex.printStackTrace();
                return "Chyba při odebírání studenta: " + ex.getMessage();
            }
        } else {
            return "Operace byla zrušena uživatelem.";
        }
    }



    public static void pridejStudenta() {
        JTextField jmenoField = new JTextField();
        JTextField prijmeniField = new JTextField();
        JTextField adresaField = new JTextField();
        JTextField kontaktField = new JTextField();
        JTextField datumNarozeniField = new JTextField();

        Object[] message = {
                "Jméno:", jmenoField,
                "Příjmení:", prijmeniField,
                "Adresa:", adresaField,
                "Kontakt:", kontaktField,
                "Datum narození:", datumNarozeniField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Přidat studenta", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            String jmeno = jmenoField.getText();
            String prijmeni = prijmeniField.getText();
            String adresa = adresaField.getText();
            String kontakt = kontaktField.getText();
            String datumNarozeni = datumNarozeniField.getText();

            Connection connection = null;
            CallableStatement callableStatement = null;

            try {
                connection = DatabaseManager.getConnection();

                String query = "{CALL PridaniStudenta(?, ?, ?, ?, ?)}";
                callableStatement = connection.prepareCall(query);
                callableStatement.setString(1, jmeno);
                callableStatement.setString(2, prijmeni);
                callableStatement.setString(3, adresa);
                callableStatement.setString(4, kontakt);
                callableStatement.setString(5, datumNarozeni);

                boolean hasResults = callableStatement.execute();

                if (!hasResults) {
                    JOptionPane.showMessageDialog(null, "Student byl úspěšně přidán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při přidávání studenta: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            } finally {
                try {
                    if (callableStatement != null) {
                        callableStatement.close();
                    }
                    if (connection != null) {
                        connection.close();
                    }
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }


}
