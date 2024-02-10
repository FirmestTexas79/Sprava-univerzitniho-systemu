import javax.swing.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

public class StudentManager {
    public static void odeberStudenta(int idStudent) {
        // Vytvoření dialogového okna pro potvrzení smazání
        String potvrzeni = JOptionPane.showInputDialog(null, "Opravdu chcete smazat tohoto studenta? Pokud ano, napište 'ano' a potvrďte:", "Potvrzení smazání", JOptionPane.WARNING_MESSAGE);

        // Kontrola uživatelova potvrzení
        if (potvrzeni != null && potvrzeni.equalsIgnoreCase("ano")) {
            try {
                Connection connection = DatabaseManager.getConnection();

                // Volání uložené procedury SQL
                String callProcedure = "{CALL odeberStudenta(?)}";
                CallableStatement callableStatement = connection.prepareCall(callProcedure);
                callableStatement.setInt(1, idStudent);
                callableStatement.execute();

                JOptionPane.showMessageDialog(null, "Student byl úspěšně odebrán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);

                connection.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při odebírání studenta: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        } else {
            JOptionPane.showMessageDialog(null, "Operace byla zrušena uživatelem.", "Zrušeno", JOptionPane.INFORMATION_MESSAGE);
        }
    }

}
